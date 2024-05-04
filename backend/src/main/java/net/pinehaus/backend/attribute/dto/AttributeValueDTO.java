package net.pinehaus.backend.attribute.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class AttributeValueDTO {

  private int attributeId;
  private String value;

}