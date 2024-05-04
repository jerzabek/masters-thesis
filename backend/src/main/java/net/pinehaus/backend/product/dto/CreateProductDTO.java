package net.pinehaus.backend.product.dto;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import net.pinehaus.backend.attribute.dto.AttributeValueDTO;

@Getter
@Setter
@RequiredArgsConstructor
public class CreateProductDTO {

  private String name;
  private String description;
  private String sku;
  private int quantity;
  private double price;
  private String thumbnail;
  private int categoryId;
  private List<AttributeValueDTO> attributes;

}