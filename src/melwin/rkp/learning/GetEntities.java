package melwin.rkp.learning;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GetEntities {

	public static String URL_BASE = "https://www.wikidata.org/w/api.php?";
	public static String ACTION = "action=";
	public static String ACTION_GET_ENTITIES = "wbgetentities";
	public static String IDS = "ids=";
	public static String FORMAT = "format=";
	public static String FORMAT_JSONFM = "jsonfm";
	
	public static String getHTML(String urlToRead) throws Exception {
		StringBuilder result = new StringBuilder();
		URL url = new URL(urlToRead);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String line;
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}
		rd.close();
		return result.toString();
	}
	
	public static void main(String[] args) throws Exception {
		String URL = URL_BASE+ACTION+ACTION_GET_ENTITIES+"&"+IDS+"Q42&"+FORMAT+FORMAT_JSONFM;
		System.out.println(URL);
		String HTML_source = getHTML(URL);
		String pre_start = "<pre>";
		String pre_end = "</pre>";
		String pre_regex = Pattern.quote(pre_start) + "(.*?)" + Pattern.quote(pre_end);
		
		Pattern pattern = Pattern.compile(pre_regex);
		Matcher matcher = pattern.matcher(HTML_source);

		while (matcher.find()) {
		  String JSON_string = matcher.group(1); 
		  System.out.println(JSON_string);
		}
	}

}
