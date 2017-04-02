// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.util;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

/**
 * @author damon.huang
 *
 */
public class JsonConverter implements HttpMessageConverter<Object> {

    private final FormHttpMessageConverter formHttpMessageConverter = new FormHttpMessageConverter();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final LinkedMultiValueMap<String, ?> LINKED_MULTI_VALUE_MAP = new LinkedMultiValueMap<String, Object>();
    @SuppressWarnings("unchecked")
    private static final Class<? extends MultiValueMap<String, ?>> LINKED_MULTI_VALUE_MAP_CLASS
            = (Class<? extends MultiValueMap<String, ?>>) LINKED_MULTI_VALUE_MAP.getClass();

    /* (non-Javadoc)
     * @see org.springframework.http.converter.HttpMessageConverter#canRead(java.lang.Class, org.springframework.http.MediaType)
     */
    public boolean canRead(final Class<?> clazz, final MediaType mediaType) {
        return objectMapper.canSerialize(clazz) && formHttpMessageConverter.canRead(MultiValueMap.class, mediaType);
    }

    /* (non-Javadoc)
     * @see org.springframework.http.converter.HttpMessageConverter#canWrite(java.lang.Class, org.springframework.http.MediaType)
     */
    public boolean canWrite(final Class<?> clazz, final MediaType mediaType) {
        return false;
    }

    /* (non-Javadoc)
     * @see org.springframework.http.converter.HttpMessageConverter#getSupportedMediaTypes()
     */
    public List<MediaType> getSupportedMediaTypes() {
        return formHttpMessageConverter.getSupportedMediaTypes();
    }

    /* (non-Javadoc)
     * @see org.springframework.http.converter.HttpMessageConverter#read(java.lang.Class, org.springframework.http.HttpInputMessage)
     */
    @SuppressWarnings("unchecked")
    public Object read(final Class<? extends Object> clazz, final HttpInputMessage inputMessage) throws IOException,
            HttpMessageNotReadableException {
        @SuppressWarnings("rawtypes")
        final Map input = formHttpMessageConverter.read(LINKED_MULTI_VALUE_MAP_CLASS, inputMessage).toSingleValueMap();
        final String jsonParamKey="jsonParam";
        if(input.containsKey(jsonParamKey)) {
//            final String jsonParam = input.get(jsonParamKey).toString();
//            final SearchParamInfo<Object> searchParamInfo = new SearchParamInfo<Object>();
//            final Object jsonParamObj = JsonHelper.json2Object(jsonParam, searchParamInfo.getClass());
//            input.put("jsonParam", jsonParamObj);
        }
        final Object objResult= objectMapper.convertValue(input, clazz);
        return objResult;
    }

    /* (non-Javadoc)
     * @see org.springframework.http.converter.HttpMessageConverter#write(java.lang.Object, org.springframework.http.MediaType, org.springframework.http.HttpOutputMessage)
     */
    public void write(final Object t, final MediaType contentType, final HttpOutputMessage outputMessage) throws IOException,
            HttpMessageNotWritableException {
        throw new UnsupportedOperationException("");
    }

}
