package net.pinehaus.backend.attribute.repository;

import java.util.Optional;
import net.pinehaus.backend.attribute.model.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttributeRepository extends JpaRepository<Attribute, Integer> {

  Optional<Attribute> findById(int id);

}