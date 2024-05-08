package net.pinehaus.backend.attribute.model;

import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.io.Serializable;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import net.pinehaus.backend.product.model.Product;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@IdClass(AttributeValue.AttributeValueId.class)
public class AttributeValue {

  @Id
  @ManyToOne
  @JoinColumn
  @JsonView(AttributeValueViews.Public.class)
  private Attribute attribute;

  @Id
  @ManyToOne
  @JoinColumn
  private Product product;

  @Column
  @JsonView(AttributeValueViews.Public.class)
  private String value;

  @Getter
  @Setter
  @RequiredArgsConstructor
  public static class AttributeValueId implements Serializable {

    private int attribute;
    private int product;
  }

}