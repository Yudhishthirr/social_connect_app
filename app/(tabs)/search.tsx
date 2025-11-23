import ExploreComponent from '@/components/explore/explorecomponet'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const search = () => {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <ExploreComponent />
      </View>
    </SafeAreaProvider>
  )
}

export default search