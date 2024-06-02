// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { useNavigation } from '@react-navigation/native'

// const AuthText = ({ type = "signIn" }) => {
//   const navigation = useNavigation()

//   const handleNavigation = (page) => {
//     navigation.navigate(page)
//   }

//   return (
//     {
//       type === "signUp" ? (
//         <>
//           <Text>
//             Already have an account?{" "}
//             <Pressable onPress={() => handleNavigation('SignInPage')}>
//               <Text>Sign In</Text>
//             </Pressable>
//           </Text>
//         </>
//       ) : (
//         <>
//           <Text>
//             Don't have an account?{" "}
//             <Pressable onPress={() => handleNavigation('SignUpPage')}>
//               <Text>Sign Up</Text>
//             </Pressable>
//           </Text>
//         </>
//       )
//     }
//   )
// }

// export default AuthText

// const styles = StyleSheet.create({})
