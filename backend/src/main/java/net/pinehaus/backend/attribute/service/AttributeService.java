package net.pinehaus.backend.attribute.service;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.attribute.model.Attribute;
import net.pinehaus.backend.attribute.repository.AttributeRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AttributeService {

  private final AttributeRepository attributeRepository;

  public Optional<Attribute> getById(int id) {
    return attributeRepository.findById(id);
  }
  
}