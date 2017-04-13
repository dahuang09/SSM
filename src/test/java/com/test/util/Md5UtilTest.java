// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.test.util;

import com.core.util.Md5Util;

/**
 * @author damon.huang
 *
 */
public class Md5UtilTest {

    /**
     * @param args
     */
    public static void main(final String[] args) {
        try {
            System.out.println(Md5Util.toMD5("123"));
        } catch (final Exception e) {
            e.printStackTrace();
        }
    }

}
