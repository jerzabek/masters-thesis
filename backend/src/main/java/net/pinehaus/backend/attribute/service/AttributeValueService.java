package net.pinehaus.backend.attribute.service;

import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.attribute.model.Attribute;
import net.pinehaus.backend.attribute.model.AttributeValue;
import net.pinehaus.backend.attribute.repository.AttributeValueRepository;
import net.pinehaus.backend.product.model.Product;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AttributeValueService {

  private final AttributeValueRepository attributeValueRepository;

  public AttributeValue setProductAttribute(Product product, Attribute attribute, String value) {
    AttributeValue attributeValue = new AttributeValue();

    attributeValue.setProduct(product);
    attributeValue.setAttribute(attribute);
    attributeValue.setValue(value);

    return attributeValueRepository.save(attributeValue);
  }

  public void removeProductAttribute(Product product, Attribute attribute) {
    attributeValueRepository.deleteByAttributeAndProduct(attribute, product);
  }

}