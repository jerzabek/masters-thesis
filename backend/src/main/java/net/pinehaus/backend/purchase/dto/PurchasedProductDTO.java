package net.pinehaus.backend.purchase.dto;

import java.util.HashMap;
import java.util.Map;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class PurchasedProductDTO {

  private int product;

  private int quantity;

  /**
   * Attribute IDs mapped to their values.
   */
  private Map<Integer, String> attributes = new HashMap<>();

}