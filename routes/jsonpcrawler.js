/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */


(function(){

	"use strict";

	var http = require('http');
	var num = function(val){return isNaN(val) ? 0 : Number(val);}

	var default_options = {
		host:'',
		port:80,
		initPageNum:1
		path:'',
		params:'',
		pageParam:'page',
		interval:1000,
		callback:undefined
	};

	var jsonpCall = function(option){
		if(!option) option = {} ;
		option = option || default_options;

		return {
			tempResult:undefined,
			currentPage:num(option.initPageNum),
			
			evaluate:function(data){
				this.tempResult=data
			},
			
			nextUrl:function(){
				return {
					host: option.host,
					port: option.port,
					path: option.path+'&'+option.pageParam+'='+this.currentPage+'&callback=me.evaluate'
				};	
			},

			next:function(){
				var url = this.nextUrl();
				var me = this;
				http.get(url, function(response){
					var body = "";
					response.addListener('data', function(chunk){
						body += chunk;
					});
					response.addListener('end', function(){
			            console.log(body);
			            eval(body);
						
						console.log(me.tempResult.length);
						option.callback(me.tempResult);
					});

				}).on('error', function(e) {
					console.log("Got error: " + e.message);
				});
				this.currentPage++;
			}
		};
			
	};

	module.exports=jsonpCall;
}());