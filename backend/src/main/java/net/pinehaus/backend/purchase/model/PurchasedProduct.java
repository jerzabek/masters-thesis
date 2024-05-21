package net.pinehaus.backend.purchase.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Min;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import net.pinehaus.backend.product.model.Product;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
@Getter
@Setter
@JsonView(PurchaseViews.Public.class)
@RequiredArgsConstructor
public class PurchasedProduct {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @JoinColumn(nullable = false)
  @ManyToOne
  private Product product;

  @Column(nullable = false)
  private String productName;

  @Column(nullable = false)
  @Min(1)
  private int quantity;

  @Column(nullable = false)
  @Min(0)
  private double price;

  @ManyToOne
  @JoinColumn(nullable = false)
  @JsonIgnore
  private Purchase purchase;

  @OneToMany(mappedBy = "product")
  @Cascade(CascadeType.ALL)
  private List<PurchasedProductAttribute> attributes = new ArrayList<>();

}