package net.pinehaus.backend.product.model;


import net.pinehaus.backend.attribute.model.AttributeValueViews;
import net.pinehaus.backend.category.model.CategoryViews;
import net.pinehaus.backend.user.model.UserViews;

public class ProductViews {

  public interface Public extends UserViews.Public, AttributeValueViews.Public,
      CategoryViews.Public {

  }
}