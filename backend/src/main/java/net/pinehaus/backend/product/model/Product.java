package net.pinehaus.backend.product.model;

import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import net.pinehaus.backend.attribute.model.AttributeValue;
import net.pinehaus.backend.category.model.Category;
import net.pinehaus.backend.user.model.UserEntity;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@JsonView(ProductViews.Public.class)
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column
  private String slug;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String description;

  @Column(nullable = false, length = 10)
  private String sku;

  @Column(nullable = false)
  private int quantity;

  @Column(nullable = false)
  private double price;

  @Column
  @JsonView(ProductViews.Public.class)
  private String thumbnail;

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<AttributeValue> attributes;

  @JoinColumn(nullable = false)
  @ManyToOne
  @JsonView(ProductViews.Public.class)
  private UserEntity createdBy;

  @JoinColumn
  @ManyToOne
  @JsonView(ProductViews.Public.class)
  private Category category;
}