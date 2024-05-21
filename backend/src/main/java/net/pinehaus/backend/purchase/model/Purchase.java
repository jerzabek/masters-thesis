package net.pinehaus.backend.purchase.model;

import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import net.pinehaus.backend.user.model.UserEntity;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@JsonView(PurchaseViews.Public.class)
public class Purchase {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @JoinColumn(nullable = false)
  @ManyToOne
  private UserEntity createdBy;

  @Column(nullable = false)
  private Timestamp timestamp;

  @Column(nullable = false)
  private double total;

  @OneToMany(mappedBy = "purchase")
  @Cascade(CascadeType.ALL)
  private List<PurchasedProduct> products = new ArrayList<>();
}