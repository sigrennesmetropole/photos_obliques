# Photos_obliques - WebApplication

This is a simple maven project, mvn clean install will build a war to be deployed in tomcat.

This application is made to be installed behind GeOrchestra security proxy. 
To install georchestra please check : https://github.com/georchestra/georchestra/

This applications is made to run on tomcat8 with postgresql 9.4 database.

## Setup middleware (tomcat8, apache) :

- once georchestra is up and working you have to choise:
    1 - Create a new instance of tomcat8 for this additional webapplication
    2 - Add this application in existing tomcat8 instance ( for exemple tomcat-cadastrapp)
- where are explaining here case 1 : 

###  Create instance
-- As for gerochestra tomcat instance, you will have to  create a new instance
    (choose a port not already use here we choose 8580 for http endpoint and 8505 to stop
```
    sudo tomcat8-instance-create -p 8580 -c 8505 /var/lib/tomcat-cadastrapp
```
###  Init policy and service
    sudo mkdir /var/lib/tomcat-photos/conf/policy.d
    sudo touch /var/lib/tomcat-photos/conf/policy.d/empty.policy
    sudo chown -R tomcat8:tomcat8 /var/lib/tomcat-photos
    sudo cp /etc/init.d/tomcat8/etc/init.d/tomcat-photos
    sudo cp /etc/default/tomcat8 /etc/default/tomcat-photos
Finally, edit the /etc/init.d/tomcat-photos script, find the following line:
```
# Provides:          tomcat8
```
... and replace it with:
```
# Provides:          tomcat-photos
```
### Customize Java options

In /etc/default/tomcat-photos, add or replace :
```
JAVA_OPTS="-Djava.awt.headless=true -XX:+UseConcMarkSweepGC"
```
And later add these lines (change the STOREPASSWORD string):
```
JAVA_OPTS="$JAVA_OPTS \
              -Xms1024m \
              -Xmx1024m \
              -XX:MaxPermSize=256m"
```
Use the same keystore than georchestra application to avoir connection errors
```
JAVA_OPTS="$JAVA_OPTS \
              -Djavax.net.ssl.trustStore=/etc/tomcat8/keystore \
              -Djavax.net.ssl.trustStorePassword=STOREPASSWORD"
```

### Configure connectors

In /var/lib/tomcat-photos/conf/server.xml, find the place where the HTTP connector is defined, and change it into:
```
    <Connector port="8580" protocol="HTTP/1.1" 
               connectionTimeout="20000" 
               URIEncoding="UTF-8"
               redirectPort="8543" />
```
### Configure datasource

In /var/lib/tomcat-photos/conf/context.xml, add a new Resource at the end of <Context> part:
```
<Resource name="jdbc/photooblique"
        auth="Container"
        type="javax.sql.DataSource"
        driverClassName="org.postgresql.Driver"
        url="jdbc:postgresql://databaseHost:databasePort/databaseName"
        username="username"
        password="password"
        maxTotal="20"
        maxIdle="10"
        maxWaitMillis="-1"
        validationQuery="select 1"
/>
```   
Add jar require for this datasource

To be able to connect to postgresql database, tomcat will have to get postgresql client librairie in his classloader. In tomcat8 instance, you will have to add postgresql-9.4.jdbc4.jar to /var/lib/tomcat-photos/lib folder (with a symlink)

### Start the instance
```
sudo insserv tomcat-photos
sudo service tomcat-photos start
Add proxy-cas information
```

### Configure proxy-cas and apache reverse proxy to let client part comunicate with server side :

See manifest.json for client side

"default_options": {
    	"servicesUrl":"https://georcehstra-vm/photooblique/services/",

In ``` /var/www/georchestra/conf``` and an new file ``` photooblique.conf``` and set this inside
```
RewriteRule ^/photooblique$ /photooblique/ [R]
<Proxy http://localhost:8180/photooblique/*>
    Order deny,allow
    Allow from all
</Proxy>
ProxyPass /photooblique/ http://localhost:8180/photooblique/
ProxyPassReverse /photooblique/ http://localhost:8180/photooblique/

RewriteCond %{HTTPS} off
RewriteCond %{REQUEST_URI} ^/photooblique/?.*$
RewriteRule ^/(.*)$ https://%{SERVER_NAME}/$1 [R=301,L]
```

add the following in security-proxy configuration file (Location will depend of georchestra installation)

Before 15.12  ``` /var/lib/tomcat-proxycas/webapps/ROOT/WEB-INF/proxy-servlet.xml```
```
<entry key="photooblique"  value="http://localhost:8580/photooblique/" />
```
Since 15.12 with dataDIR or ```$DATADIR\security-proxy\targets-mapping.properties``` 
```
photooblique=http://localhost:8580/photooblique/
```
Then restart proxy-cas instance
sudo service tomcat-proxycas restart


##  Configure application : 

Only two files can be configure :

The spring configuration file
```src/main/webapp/WEB-INF/beans.xml``` 

The application configuration file (can be in datadir as well) :
```src/main/resources/photooblique.properties```

In this file replace schema.name depending on server script installation option
for exemple : ```schema.name=phototheque```

##  Build application : 

mvn clean install


##  Deploy application : 

Copy war build previously in tomcat-cadastrapp webapps folder

sudo cp ./target/photooblique.war /var/lib/tomcat-photos/webapps/photooblique.war


### Restart the instance

sudo service tomcat-photos restart
