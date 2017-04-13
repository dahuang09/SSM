package com.core.util;

import java.security.MessageDigest;

import org.apache.log4j.Logger;

public final class Md5Util {
	private static Logger logger = Logger.getLogger(Md5Util.class);

	public static String toMD5(String plainText) throws Exception {
	   try {
	    //生成实现指定摘要算法的 MessageDigest 对象。
	    MessageDigest md = MessageDigest.getInstance("MD5");
	    //使用指定的字节数组更新摘要。
	    md.update(plainText.getBytes());
	    //通过执行诸如填充之类的最终操作完成哈希计算。
	    byte b[] = md.digest();
	    //生成具体的md5密码到buf数组
	    int i;
	    StringBuffer buf = new StringBuffer("");
	    for (int offset = 0; offset < b.length; offset++) {
	     i = b[offset];
	     if (i < 0)
	      i += 256;
	     if (i < 16)
	      buf.append("0");
	     buf.append(Integer.toHexString(i));
	    }
	    logger.info("32位: " + buf.toString());// 32位的加密
	    return buf.toString();
	   }
	   catch (Exception e) {
		   logger.error("密码加密失败", e);
		   throw e;
	   }
	}
}
