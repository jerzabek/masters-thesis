package net.pinehaus.backend.attribute.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.attribute.dto.AttributeValueDTO;
import net.pinehaus.backend.attribute.model.Attribute;
import net.pinehaus.backend.attribute.model.AttributeValue;
import net.pinehaus.backend.attribute.repository.AttributeValueRepository;
import net.pinehaus.backend.product.model.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AttributeValueService {

  private final AttributeValueRepository attributeValueRepository;
  private final AttributeService attributeService;

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

  @Transactional
  public void compareAndUpdateAttributeValues(Product product, List<AttributeValueDTO> updated) {
    List<AttributeValue> current = attributeValueRepository.findByProductId(product.getId());

    for (AttributeValue attributeValue : current) {
      Optional<AttributeValueDTO> matchingUpdatedAttribute = updated.stream()
                                                                    .filter(updateAttribute ->
                                                                        updateAttribute.getAttributeId()
                                                                            == attributeValue.getAttribute()
                                                                                             .getId())
                                                                    .findFirst();

      if (matchingUpdatedAttribute.isPresent()) {
        // If value is different then update value
        if (!matchingUpdatedAttribute.get().getValue().equals(attributeValue.getValue())) {
          attributeValue.setValue(matchingUpdatedAttribute.get().getValue());
          attributeValueRepository.save(attributeValue);
        }
      } else {
        // If attributeValueDTO is not found in updated, then remove it
        attributeValueRepository.deleteByAttributeIdAndProductId(
            attributeValue.getAttribute().getId(), product.getId());
      }
    }

    for (AttributeValueDTO updatedAttribute : updated) {
      Optional<AttributeValue> matchingCurrentAttribute = current.stream()
                                                                 .filter(currentAttribute ->
                                                                     currentAttribute.getAttribute()
                                                                                     .getId()
                                                                         == updatedAttribute.getAttributeId())
                                                                 .findFirst();

      if (matchingCurrentAttribute.isEmpty()) {
        // If updatedAttribute is not found in current, then create it
        Attribute attribute = attributeService.getById(updatedAttribute.getAttributeId())
                                              .orElseThrow();

        AttributeValue newAttributeValue = new AttributeValue();
        newAttributeValue.setProduct(product);
        newAttributeValue.setAttribute(attribute);
        newAttributeValue.setValue(updatedAttribute.getValue());
        attributeValueRepository.save(newAttributeValue);
      }
    }

  }

}