package com.cloud.fileupload.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class FileUploadController {
	
	
	/**
	 * 
	 * @Description: 上传图片controller
	 * @author kai  
	 * @throws IOException 
	 * @date 2017年6月13日 下午11:02:20  
	 *
	 */
	@PostMapping(value="/upload")
	@ResponseBody
	public String handleFileUpload(@RequestParam(value="file",required = true)MultipartFile file) throws IOException{
		byte[] bytes = file.getBytes();
		File fileToSave = new File(file.getOriginalFilename());
		FileCopyUtils.copy(bytes, fileToSave);
		return fileToSave.getAbsolutePath();
		
	}

}
