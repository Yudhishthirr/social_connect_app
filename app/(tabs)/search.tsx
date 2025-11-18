import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ExploreComponent from '../../components/explore/explorecomponet'

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