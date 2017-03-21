// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.exception;

/**
 * @author damon.huang
 *
 */
public class DaoException extends RuntimeException {

    private static final long serialVersionUID = 4685177910811379243L;
    private final Throwable e;
    private String message;

    public DaoException(final Throwable e) {
        this.e = e;
    }

    public DaoException(final String message, final Throwable e) {
        this.message = message;
        this.e = e;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
