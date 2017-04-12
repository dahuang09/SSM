// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.dao.factory;

import java.io.IOException;
import java.io.Reader;
import java.net.URL;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.log4j.Logger;

/**
 * @author damon.huang
 *
 */
public final class SessionFactory {

    private static final SessionFactory instance;
    private static SqlSessionFactory sqlSessionFactory;
    private static final Logger logger = Logger.getLogger(SessionFactory.class);

    static {
        instance = new SessionFactory();
        final String resource = "mybatis-config.xml";
        final URL url = SessionFactory.class.getClassLoader().getResource(resource);
        final String filePath = url.toString();
        logger.debug("Try to get resource from classpath: " + filePath);
        Reader reader;
        try {
            reader = Resources.getUrlAsReader(filePath);
           sqlSessionFactory =
                    new SqlSessionFactoryBuilder().build(reader);
            /*final SqlSession session = sqlSessionFactory.openSession();
            try {
                final UserMapper mapper = session.getMapper(UserMapper.class);
              final User user = mapper.selectByPrimaryKey("joyce");
              logger.info("空？" + user == null);
            } finally {
              session.close();
            }*/
        } catch (final IOException e) {
            e.printStackTrace();
        }
    }

    private SessionFactory() {}

    public static SessionFactory getInstance() {
        return instance;
    }

    /**
     * @return the sqlSessionFactory
     */
    public SqlSessionFactory getSqlSessionFactory() {
        return sqlSessionFactory;
    }



}
