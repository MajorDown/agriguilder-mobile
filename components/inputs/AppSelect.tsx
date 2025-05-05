import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

export type SelectOption = {
  label: string;
  value: string | number;
};

export type AppSelectProps = {
  options: SelectOption[];
  onSelect: (value: string | number) => void;
  defaultValue?: SelectOption;
  placeholder?: string;
};

/**
 * @description Composant de sélection réutilisable avec animation et gestion d'état.
 * @param {SelectOption[]} options - Liste des options à afficher dans le sélecteur.
 * @param {(value: string | number) => void} onSelect - Fonction de rappel appelée lors de la sélection d'une option.
 * @param {SelectOption} [defaultValue] - Valeur par défaut à afficher dans le sélecteur.
 * @param {string} [placeholder] - Texte d'espace réservé à afficher lorsque aucune option n'est sélectionnée.
 * @returns {JSX.Element} - Composant de sélection.
 */
const AppSelect = ({
  options,
  onSelect,
  defaultValue,
  placeholder = 'Sélectionner une option',
}: AppSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOption | undefined>(defaultValue);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const containerRef = useRef<View>(null);
  const maxHeight = 150;

  const toggleDropdown = () => {
    if (isOpen) {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      Animated.timing(animatedHeight, {
        toValue: maxHeight,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSelect = (item: SelectOption) => {
    setSelected(item);
    onSelect(item.value);
    toggleDropdown();
  };

  // Ferme si on clique hors du composant
  useEffect(() => {
    const hideDropdown = () => {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start(() => setIsOpen(false));
    };

    if (isOpen) {
      const timeout = setTimeout(() => {
        const listener = () => hideDropdown();
        document.addEventListener('click', listener);
        return () => document.removeEventListener('click', listener);
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <View ref={containerRef} style={styles.container}>
      {isOpen && (
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <Pressable style={styles.button} onPress={toggleDropdown}>
        <Text style={styles.buttonText}>
          {selected?.label || placeholder}
        </Text>
        <Image
          source={
            isOpen
              ? require('@/assets/images/icons/arrow-green-left.png')
              : require('@/assets/images/icons/arrow-green-right.png')
          }
          style={styles.icon}
        />
      </Pressable>

      {isOpen && (
        <Animated.View style={[styles.dropdown, { height: animatedHeight }]}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <Pressable style={styles.option} onPress={() => handleSelect(item)}>
                <Text style={styles.optionText}>{item.label}</Text>
              </Pressable>
            )}
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 500,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    zIndex: 1001,
  },
  buttonText: {
    fontSize: 16,
    color: '#222',
  },
  icon: {
    width: 20,
    height: 12,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#999',
    marginTop: 4,
    overflow: 'hidden',
    zIndex: 1000,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default AppSelect;
