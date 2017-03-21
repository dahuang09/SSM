// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.util;

import java.util.UUID;

/**
 * @author damon.huang
 *
 */
public final class UuidUtil {
    private UuidUtil() {

    }

    public static String createUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
