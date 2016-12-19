package org.georchestra.hibernate.dialect;

import org.hibernate.dialect.PostgreSQL94Dialect;
import org.hibernate.dialect.function.SQLFunctionTemplate;
import org.hibernate.type.StandardBasicTypes;

/**
 * An SQL dialect for Postgres 9.4 and later. Adds support for various date and time functions
 */
public class PostgreSQL94DialectSimilarTo extends PostgreSQL94Dialect {

	/**
	 * Constructs a PostgreSQL94Dialect
	 */
	public PostgreSQL94DialectSimilarTo() {
		 super();
	        registerFunction(
	          "similarto", new SQLFunctionTemplate(StandardBasicTypes.BOOLEAN,
	          "(case when (?1 SIMILAR TO ?2) then 1 else 0 end)")
	        );
	}
}