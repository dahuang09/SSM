//Copyright (c) 1998-2016 Core Solutions Limited. All rights reserved.
//============================================================================
//CURRENT VERSION CNT.5.0.1
//============================================================================
//CHANGE LOG
//CNT.5.0.1 : 2016-XX-XX, damon.huang, creation
//============================================================================
package com.core.service;

import java.util.List;
import java.util.Map;

import com.core.pojo.Search;
;
public interface ISearchService {
 public Search getSearchById(String searchId);
 Map<String, ?> listSearch(String searchName, int start, int limit);
 List<Search> searchSearch();
}
