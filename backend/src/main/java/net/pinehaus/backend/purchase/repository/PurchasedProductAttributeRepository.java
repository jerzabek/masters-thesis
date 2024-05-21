package net.pinehaus.backend.purchase.repository;

import net.pinehaus.backend.purchase.model.PurchasedProductAttribute;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchasedProductAttributeRepository extends
    JpaRepository<PurchasedProductAttribute, Integer> {

}