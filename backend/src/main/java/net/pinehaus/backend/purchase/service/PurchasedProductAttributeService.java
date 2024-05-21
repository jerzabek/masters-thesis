package net.pinehaus.backend.purchase.service;

import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.purchase.dto.PurchasedProductAttributeDTO;
import net.pinehaus.backend.purchase.model.PurchasedProduct;
import net.pinehaus.backend.purchase.model.PurchasedProductAttribute;
import net.pinehaus.backend.purchase.repository.PurchasedProductAttributeRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PurchasedProductAttributeService {

  private final PurchasedProductAttributeRepository purchasedProductAttributeRepository;

  public PurchasedProductAttribute createPurchasedProductAttribute(PurchasedProductAttributeDTO request,
      PurchasedProduct product) {
    PurchasedProductAttribute attribute = new PurchasedProductAttribute();

    attribute.setName(request.getName());
    attribute.setValue(request.getValue());

    return attribute;
  }

  public void save(PurchasedProductAttribute attribute) {
    purchasedProductAttributeRepository.save(attribute);
  }
}