import Colors from '@/constants/AppColors';
import {
  useRef,
  useState
} from 'react';
import {
  Animated,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  UIManager,
  View,
  findNodeHandle,
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

const AppSelect = ({
  options,
  onSelect,
  defaultValue,
  placeholder = 'Sélectionner une option',
}: AppSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOption | undefined>(defaultValue);
  const [position, setPosition] = useState({ x: 0, y: 0, height: 0 });

  const selectRef = useRef<View>(null);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const maxHeight = 150;
  const dropdownWidth = 250;

  const openDropdown = () => {
    if (selectRef.current) {
      const handle = findNodeHandle(selectRef.current);
      if (handle) {
        UIManager.measure(handle, (_x, _y, _width, height, pageX, pageY) => {
          setPosition({ x: pageX, y: pageY, height });
          setIsOpen(true);
          Animated.timing(animatedHeight, {
            toValue: maxHeight,
            duration: 150,
            useNativeDriver: false,
          }).start();
        });
      }
    }
  };

  const closeDropdown = () => {
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start(() => setIsOpen(false));
  };

  const handleSelect = (item: SelectOption) => {
    setSelected(item);
    onSelect(item.value);
    closeDropdown();
  };

  return (
    <>
      <Pressable
        ref={selectRef}
        style={styles.button}
        onPress={openDropdown}
      >
        <Text style={styles.buttonText}>
          {selected?.label || placeholder}
        </Text>
        <Image
          source={
            isOpen
              ? require('@/assets/images/icons/arrow_up.png')
              : require('@/assets/images/icons/arrow_down.png')
          }
          style={styles.icon}
        />
      </Pressable>

      <Modal transparent visible={isOpen} animationType="none">
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.dropdown,
                {
                  top: position.y + position.height,
                  left: position.x,
                  width: dropdownWidth,
                  height: animatedHeight,
                },
              ]}
            >
              <FlatList
                data={options}
                keyExtractor={(item) => item.value.toString()}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.option}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.optionText}>{item.label}</Text>
                  </Pressable>
                )}
                keyboardShouldPersistTaps="handled"
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    padding: 5,
    backgroundColor: '#fff',
    width: 300,
  },
  buttonText: {
    fontSize: 16,
    color: '#222',
  },
  icon: {
    width: 20,
    height: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: Colors.global,
    overflow: 'hidden',
    zIndex: 9999,
    borderWidth: 1,
    borderColor: '#999',
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