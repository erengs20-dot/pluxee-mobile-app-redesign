/**
 * Pluxee Mobile App - Button Showcase
 * Design system Button component'inin tüm variant'larını test ediyoruz.
 */

import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, semantic, typography, spacing } from '@pluxee/design-system';

export default function App() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      {/* Hero başlık */}
      <Text style={styles.heroTitle}>Pluxee</Text>
      <Text style={styles.heroSubtitle}>Button Component Showcase</Text>

      {/* === CHAMFERED (Pluxee imza) === */}
      <Section title="Chamfered (İmza)">
        <Button onPress={() => console.log('Chamfered pressed')}>
          Devam Et
        </Button>
        <Button size="md" onPress={() => console.log('md pressed')}>
          Orta Boy
        </Button>
        <Button size="sm" onPress={() => console.log('sm pressed')}>
          Küçük Boy
        </Button>
        <Button disabled>Devre Dışı</Button>
      </Section>

      {/* === FILLED === */}
      <Section title="Filled (Dolgulu)">
        <Button variant="primaryFilled" onPress={() => {}}>
          Primary Filled
        </Button>
        <Button variant="secondaryFilled" onPress={() => {}}>
          Secondary Filled
        </Button>
      </Section>

      {/* === OUTLINED === */}
      <Section title="Outlined (Çerçeveli)">
        <Button variant="primaryOutlined" onPress={() => {}}>
          Primary Outlined
        </Button>
        <Button variant="secondaryOutlined" onPress={() => {}}>
          Secondary Outlined
        </Button>
      </Section>

      {/* === TEXT ONLY === */}
      <Section title="Text Only">
        <Button variant="primaryTextOnly" onPress={() => {}}>
          Primary Text
        </Button>
        <Button variant="secondaryTextOnly" onPress={() => {}}>
          Secondary Text
        </Button>
      </Section>

      {/* === LOADING === */}
      <Section title="Loading State">
        <Button isLoading>Yükleniyor</Button>
        <Button variant="primaryFilled" isLoading>
          Yükleniyor
        </Button>
      </Section>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// Section helper - her bolum icin baslik + button grup
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.buttonGroup}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semantic.background.primary,
  },
  content: {
    padding: spacing[6],
    paddingTop: spacing[16],
  },
  heroTitle: {
    ...typography.heroTitle.mobileMediumBlack,
    color: semantic.brand.primary,
    marginBottom: spacing[1],
  },
  heroSubtitle: {
    ...typography.subtitle.mobileMain,
    color: semantic.text.secondary,
    marginBottom: spacing[8],
  },
  section: {
    marginBottom: spacing[8],
  },
  sectionTitle: {
    ...typography.title.mobileSection,
    color: semantic.text.primary,
    marginBottom: spacing[4],
  },
  buttonGroup: {
    gap: spacing[3],
    alignItems: 'flex-start',
  },
});
