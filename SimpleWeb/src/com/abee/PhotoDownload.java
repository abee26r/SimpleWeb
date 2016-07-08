package com.abee;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
//"http://www.lauramares.com/cdn/ac/l0swtrj2rgpu/994468049/iiuuqdswvmwc/mh/wfwbyczmfni92iv_5ese/s12/v175/p2041154508-5.jpg?ts=2YJ&tk=jdKBD6id8gfj6u3pQyT2-hwdNRHCpqClluh7KbiptIHTY4Qp16buTepB1fS9Ox_dwTu4OtKgfUC_02JMDQce5A==&keyringx=g3poLVALmq7OpnDTtcqt0DJ-4vh_rOVFL40AItGyDO-GZF25hF3_E9lHGAPcP_Nq_beDUafHYJKy034IpzMdauOaAlTf7_UDtkTEbNmlYReWvXhq6-eYE_D8_K43ZpfRKl6Z0oqy4sg8Ix0jrOnzdQ=="
public class PhotoDownload {
	private final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0";

	public static void main(String[] args) throws Exception {

		PhotoDownload http = new PhotoDownload();

		System.out.println("Testing 1 - Send Http GET request");
		http.sendGet();

//		System.out.println("\nTesting 2 - Send Http POST request");
//		http.sendPost();

	}

	// HTTP GET request
	private void sendGet() throws Exception {

		String url = "http://www.lauramares.com/cdn/ac/l0swtrj2rgpu/994468049/iiuuqdswvmwc/mh/wfwbyczmfni92iv_5ese/s12/v175/p2041154508-5.jpg?ts=2YJ&tk=jdKBD6id8gfj6u3pQyT2-hwdNRHCpqClluh7KbiptIHTY4Qp16buTepB1fS9Ox_dwTu4OtKgfUC_02JMDQce5A==&keyringx=g3poLVALmq7OpnDTtcqt0DJ-4vh_rOVFL40AItGyDO-GZF25hF3_E9lHGAPcP_Nq_beDUafHYJKy034IpzMdauOaAlTf7_UDtkTEbNmlYReWvXhq6-eYE_D8_K43ZpfRKl6Z0oqy4sg8Ix0jrOnzdQ==";

		HttpClient client = new DefaultHttpClient();
		HttpGet request = new HttpGet(url);

		// add request header
		request.addHeader("User-Agent", USER_AGENT);
		request.addHeader("Cookie", "zf_edgeauth=~~access=/cdn/ac/qem9pucqidks/994468049/iiuuqdswvmwc/*~md5=56d7ed261f9ddf0661cd35367736aa20; zf_5y_visitor=xkcMWH2z-6hDPaVAkIgykkk02SEAAAAAK2m7R6PTt8qq; zf_pat=994468049$lauramares$www.lauramares.com$396676290$492530544; zf_cdo=lauramares; zf_lsc=UnmfE+bkeDIA4rhsypD1kaaV.847813984.0.0; zf_10y_tz=-240; _ga=GA1.2.515656150.1464750357; _gat=1; __qca=P0-650082535-1464750356969; zf_keyring=nWsfTIpj-lWC2YVav5tEqMALkwpWoKEo2xGvPkScCLuJWAp3bUs7Mz8hh3ciGo0XqVppE-gOUMl-LlDcPGb0m8ErPhEeooPCbNTk461jMkL9tKJ3dOuolbenB13QKPuog7KTIJ_9pctRfJqmb7U_Vg");
		HttpResponse response = client.execute(request);

		System.out.println("\nSending 'GET' request to URL : " + url);
		System.out.println("Response Code : " + 
                       response.getStatusLine().getStatusCode());

		BufferedReader rd = new BufferedReader(
                       new InputStreamReader(response.getEntity().getContent()));

		StringBuffer result = new StringBuffer();
		String line = "";
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}

		System.out.println(result.toString());

	}

	// HTTP POST request
	private void sendPost() throws Exception {

		String url = "https://selfsolve.apple.com/wcResults.do";

		HttpClient client = new DefaultHttpClient();
		HttpPost post = new HttpPost(url);

		// add header
		post.setHeader("User-Agent", USER_AGENT);

		List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
		urlParameters.add(new BasicNameValuePair("sn", "C02G8416DRJM"));
		urlParameters.add(new BasicNameValuePair("cn", ""));
		urlParameters.add(new BasicNameValuePair("locale", ""));
		urlParameters.add(new BasicNameValuePair("caller", ""));
		urlParameters.add(new BasicNameValuePair("num", "12345"));

		post.setEntity(new UrlEncodedFormEntity(urlParameters));

		HttpResponse response = client.execute(post);
		System.out.println("\nSending 'POST' request to URL : " + url);
		System.out.println("Post parameters : " + post.getEntity());
		System.out.println("Response Code : " + 
                                    response.getStatusLine().getStatusCode());

		BufferedReader rd = new BufferedReader(
                        new InputStreamReader(response.getEntity().getContent()));

		StringBuffer result = new StringBuffer();
		String line = "";
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}

		System.out.println(result.toString());

	}

	
	private void writeto(byte[] response) throws Exception{
		// TODO Auto-generated method stub
		FileOutputStream fos = new FileOutputStream(
				"C:/Users/abee/Pictures/Saved Pictures");
		fos.write(response);
		fos.close();
	}
}
