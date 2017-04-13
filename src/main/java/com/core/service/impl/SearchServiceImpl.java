// Copyright (c) 1998-2017 Core Solutions Limited. All rights reserved.
// ============================================================================
// CURRENT VERSION CNT.5.0.1
// ============================================================================
// CHANGE LOG
// CNT.5.0.1 : 2017-XX-XX, damon.huang, creation
// ============================================================================
package com.core.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import com.core.dao.BizNoDefinitionMapper;
import com.core.dao.SearchMapper;
import com.core.exception.ServiceException;
import com.core.pojo.Search;
import com.core.service.ISearchService;

@Service("searchService")
public class SearchServiceImpl implements ISearchService {
    private final Logger log = Logger.getLogger(SearchServiceImpl.class);
    @Resource
    private SearchMapper searchMapper;
    @Resource
    private BizNoDefinitionMapper bizNoDefinitionMapper;

    /* (non-Javadoc)
     * @see com.core.service.ISearchService#getSearchById(java.lang.String)
     */
    public Search getSearchById(final String searchId) throws ServiceException {
        return null;
    }



    public List<Search> searchSearch() {
        // TODO Auto-generated method stub
        return null;
    }

    /* (non-Javadoc)
     * @see com.core.service.IVendorService#listVendor(java.lang.String, int, int)
     */
    public Map<String, ?> listSearch(final String SearchName, final int start, final int limit) {
        final Map<String, Object> map = new HashMap<String, Object>();
        final int total = searchMapper.countSearch();
        final List<Search> searchList = searchMapper.listSearch(SearchName, start, limit);
        map.put("total", total);
        map.put("searchList", searchList);
        return map;
    }





}
