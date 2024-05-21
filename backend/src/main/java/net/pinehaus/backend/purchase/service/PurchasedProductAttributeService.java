package net.pinehaus.backend.purchase.service;

import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.purchase.model.PurchasedProduct;
import net.pinehaus.backend.purchase.model.PurchasedProductAttribute;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PurchasedProductAttributeService {


  public PurchasedProductAttribute create(PurchasedProduct purchasedProduct, String name, String value) {
    PurchasedProductAttribute attribute = new PurchasedProductAttribute();

    attribute.setProduct(purchasedProduct);
    attribute.setName(name);
    attribute.setValue(value);

    return attribute;
  }

}