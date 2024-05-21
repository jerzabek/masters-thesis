package net.pinehaus.backend.purchase.dto;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class CreatePurchaseDTO {
  
  private List<PurchasedProductDTO> products;

}