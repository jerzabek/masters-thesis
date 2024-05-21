package net.pinehaus.backend.purchase.repository;

import java.util.List;
import java.util.UUID;
import net.pinehaus.backend.purchase.model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {

  List<Purchase> findByCreatedBy_IdOrderByTimestampDesc(UUID userId);


}