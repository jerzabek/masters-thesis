package net.pinehaus.backend.util;

import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.Locale;
import java.util.regex.Pattern;

public class Slugify {

  private static final Pattern NON_LATIN = Pattern.compile("[^\\w-]");
  private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

  public static String slugify(String input) {
    String noWhitespace = WHITESPACE.matcher(input).replaceAll("-");
    String normalized = Normalizer.normalize(noWhitespace, Form.NFD);
    String slug = NON_LATIN.matcher(normalized).replaceAll("");
    return slug.toLowerCase(Locale.ENGLISH);
  }
}