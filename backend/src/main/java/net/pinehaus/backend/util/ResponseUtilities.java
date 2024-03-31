package net.pinehaus.backend.util;

import java.util.HashMap;

public class ResponseUtilities {

  public static HashMap<String, String> createResponse(String key, String value) {
    HashMap<String, String> response = new HashMap<>();
    response.put(key, value);
    return response;
  }

  public static HashMap<String, String> successResponse() {
    return createResponse("message", "Success");
  }

  public static HashMap<String, String> errorResponse() {
    return createResponse("message", "An error occurred");
  }

  public static HashMap<String, String> errorResponse(String message) {
    return createResponse("message", message);
  }

}