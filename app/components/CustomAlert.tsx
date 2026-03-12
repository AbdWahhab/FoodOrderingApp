import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Button = {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
};

type Props = {
  visible: boolean;
  title: string;
  message: string;
  buttons: Button[];
  onClose: () => void;
};

export default function CustomAlert({ visible, title, message, buttons, onClose }: Props) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Dark overlay */}
      <View style={styles.overlay}>
        <View style={styles.alertBox}>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Message */}
          <Text style={styles.message}>{message}</Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            {buttons.map((btn, index) => (
              btn.style === 'cancel' ? (
                <TouchableOpacity
                  key={index}
                  style={styles.cancelButton}
                  onPress={() => {
                    onClose();
                    btn.onPress?.();
                  }}
                >
                  <Text style={styles.cancelText}>{btn.text}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={index}
                  style={styles.confirmButton}
                  onPress={() => {
                    onClose();
                    btn.onPress?.();
                  }}
                >
                  <LinearGradient
                    colors={btn.style === 'destructive' ? ['#e74c3c', '#c0392b'] : ['#e67e22', '#f39c12']}
                    style={styles.confirmGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.confirmText}>{btn.text}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )
            ))}
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  alertBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#eee',
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#999',
  },
  confirmButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  confirmGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});