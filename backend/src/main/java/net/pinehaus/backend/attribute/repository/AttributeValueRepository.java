package net.pinehaus.backend.attribute.repository;

import net.pinehaus.backend.attribute.model.Attribute;
import net.pinehaus.backend.attribute.model.AttributeValue;
import net.pinehaus.backend.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttributeValueRepository extends
    JpaRepository<AttributeValue, AttributeValue.AttributeValueId> {

  void deleteByAttributeAndProduct(Attribute attribute, Product product);

}