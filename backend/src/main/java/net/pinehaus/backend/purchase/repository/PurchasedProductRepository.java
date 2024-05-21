package net.pinehaus.backend.purchase.repository;

import net.pinehaus.backend.purchase.model.PurchasedProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchasedProductRepository extends JpaRepository<PurchasedProduct, Integer> {

}