package melwin.rkp.learning;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import com.github.jsonldjava.core.JsonLdOptions;
import com.github.jsonldjava.core.JsonLdProcessor;
import com.github.jsonldjava.utils.JsonUtils;

public class Person1and2 {

	public final static String RESOURCE_DIR = "resources/";

	public static void main(String[] args) throws Exception {

		InputStream inputStream_1 = new FileInputStream(RESOURCE_DIR + "person_1.json");
		Object jsonObject_1 = JsonUtils.fromInputStream(inputStream_1);
		InputStream inputStream_2 = new FileInputStream(RESOURCE_DIR + "person_2.json");
		Object jsonObject_2 = JsonUtils.fromInputStream(inputStream_2);

		Map context = new HashMap();
		JsonLdOptions options = new JsonLdOptions();

		
		System.out.println("\n=== COMPACT ===");
		Object person_1 = JsonLdProcessor.compact(jsonObject_1, context, options);
		System.out.println(JsonUtils.toPrettyString(person_1));
		
		Object person_2 = JsonLdProcessor.compact(jsonObject_2, context, options);
		System.out.println(JsonUtils.toPrettyString(person_2));

		
		System.out.println("\n=== FLATTEN ===");
		Object flattened_1 = JsonLdProcessor.flatten(person_1, context, options);
		System.out.println("\nPerson#1:" + JsonUtils.toPrettyString(flattened_1));
		
		Object flattened_2 = JsonLdProcessor.flatten(person_2, context, options);
		System.out.println("\nPerson#2:" + JsonUtils.toPrettyString(flattened_2));

	}

}
