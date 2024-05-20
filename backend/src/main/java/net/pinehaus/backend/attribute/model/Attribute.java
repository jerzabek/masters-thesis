package net.pinehaus.backend.attribute.model;

import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@RequiredArgsConstructor
@JsonView(AttributeViews.Public.class)
public class Attribute {

  @Id
  @Getter
  @Setter
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Setter
  @Getter
  @Column(nullable = false)
  private String name;

  @Setter
  @Getter
  @Column(nullable = false)
  private AttributeType type;

  /**
   * Options for the attribute. Only used if the attribute type is ENUM. Contains a comma-separated
   * list of options.
   */
  @Column
  private String options;

  public List<String> getOptions() {
    if (options == null) {
      return null;
    }

    return List.of(options.split(","));
  }

  public void setOptions(List<String> options) {
    this.options = String.join(",", options);
  }

}