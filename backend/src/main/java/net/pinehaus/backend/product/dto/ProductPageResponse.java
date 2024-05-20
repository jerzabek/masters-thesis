package net.pinehaus.backend.product.dto;

import com.fasterxml.jackson.annotation.JsonView;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import net.pinehaus.backend.product.model.Product;
import net.pinehaus.backend.product.model.ProductViews;
import org.springframework.data.domain.Page;

@Getter
@Setter
@JsonView(ProductViews.Public.class)
public class ProductPageResponse {

  private int totalPages;
  private List<Product> products;

  public ProductPageResponse(Page<Product> page) {
    this.totalPages = page.getTotalPages();
    this.products = page.getContent();
  }

}