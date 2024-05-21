package net.pinehaus.backend.purchase.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class PurchasedProductAttributeDTO {

  private String name;

  private String value;

}