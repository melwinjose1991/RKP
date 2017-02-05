package melwin.rkp.learning;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.github.jsonldjava.core.JsonLdOptions;
import com.github.jsonldjava.core.JsonLdProcessor;
import com.github.jsonldjava.utils.JsonUtils;

public class ExpansionCompaction {

	public final static String RESOURCE_DIR = "resources/";

	public static void main(String[] args) throws Exception {

		InputStream inputStream = new FileInputStream(RESOURCE_DIR + "person_1.json");
		Object jsonObject = JsonUtils.fromInputStream(inputStream);
		Map context = new HashMap();
		JsonLdOptions options = new JsonLdOptions();
		Object compact = JsonLdProcessor.compact(jsonObject, context, options);

		System.out.println("\n=== COMPACT ===");
		System.out.println(JsonUtils.toPrettyString(compact));

		System.out.println("\n=== EXPANSION ===");
		List<Object> expanded = JsonLdProcessor.expand(jsonObject);
		for (Object expanded_object : expanded) {
			System.out.println("Expanded Object:" + JsonUtils.toPrettyString(expanded_object));

			Map<String, Object> compactions = JsonLdProcessor.compact(expanded_object, context, options);

			Iterator it = compactions.entrySet().iterator();
			while (it.hasNext()) {
				Map.Entry pair = (Map.Entry) it.next();
				System.out.println("Compacted Object:" + pair.getKey() + " = " + pair.getValue());
				it.remove();
			}
		}

		System.out.println("\n=== FLATTEN ===");
		Object flattened = JsonLdProcessor.flatten(compact, options);
		System.out.println(JsonUtils.toPrettyString(flattened));
	}

}
