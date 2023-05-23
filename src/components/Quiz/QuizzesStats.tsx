import React from "react"
import {
  Box,
  Circle,
  Flex,
  Grid,
  GridItem,
  Icon,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react"
import { FaTwitter } from "react-icons/fa"

import Button from "../Button"
import Translation from "../Translation"

import { TrophyIcon } from "../icons/quiz"

export interface IProps {
  totalQuizzesNumber: number
  userScore: number
}

// TODO: move to custom re-usable hook, remove from QuizWidget??
// TODO: update tw sharing copy
const handleShare = (): void => {
  // if (!quizData || !window) return
  // trackCustomEvent({
  //   eventCategory: "Quiz widget",
  //   eventAction: "Other",
  //   eventName: "Share results",
  // })
  const url = `https://ethereum.org${window.location.pathname}%23quiz` // %23 is # character, needs to added to already encoded tweet string
  const tweet =
    encodeURI(
      `I just took the "X" quiz on ethereum.org and scored Y out of Z! Try it yourself at `
    ) + url
  window.open(
    `https://twitter.com/intent/tweet?text=${tweet}&hashtags=${"ethereumquiz"}`
  )
}

const QuizzesStats: React.FC<IProps> = ({ totalQuizzesNumber, userScore }) => {
  // useEffect(() => {
  //   if (localStorage.getItem(USER_SCORE_KEY)) {
  //     setUserScore(localStorage.getItem(USER_SCORE_KEY)!)
  //   } else {
  //     localStorage.setItem(USER_SCORE_KEY, "0")
  //     setUserScore("0")
  //   }
  // }, [])

  // TODO: compute value and remove hardcoded number
  const TOTAL_QUIZZES_POINTS = 37
  const USER_SCORE_KEY = "userScoreKey"

  return (
    <Box flex={1} order={{ base: 1, lg: 2 }} w="full">
      <Stack mt={{ base: 0, lg: 12 }} gap={{ base: 8, lg: 4 }}>
        {/* user stats */}
        <Grid
          gap={4}
          bg="ednBackground"
          borderRadius={{ base: "none", lg: "lg" }}
          border="none"
          p={{ base: 8, lg: 12 }}
          mb={-2}
        >
          <GridItem colSpan={{ base: 2, lg: 1 }} alignSelf="center" order={1}>
            <Text
              fontWeight="bold"
              fontSize="xl"
              margin={0}
              textAlign={{ base: "center", lg: "left" }}
            >
              <Translation id="your-total" />
            </Text>
          </GridItem>

          <GridItem
            colSpan={{ base: 2, lg: 1 }}
            justifySelf={{ base: "auto", lg: "end" }}
            alignSelf="center"
            order={{ base: 3, lg: 2 }}
          >
            <Button
              variant="outline-color"
              leftIcon={<Icon as={FaTwitter} />}
              onClick={handleShare}
              w={{ base: "full", lg: "auto" }}
              mt={{ base: 2, lg: 0 }}
            >
              <Translation id="share-results" />
            </Button>
          </GridItem>

          <GridItem colSpan={2} order={{ base: 2, lg: 3 }}>
            <Stack gap={2}>
              <Flex
                justifyContent={{ base: "center", lg: "flex-start" }}
                alignItems="center"
              >
                <Circle size="64px" bg="primary" mr={4}>
                  <TrophyIcon color="neutral" w="35.62px" h="35.62px" />
                </Circle>

                <Text fontWeight="bold" fontSize="5xl" mb={0}>
                  {userScore}
                  <Text as="span" color="bodyLight">
                    /{TOTAL_QUIZZES_POINTS}
                  </Text>
                </Text>
              </Flex>

              {/* TODO: remove hardcoded value */}
              <Progress value={20} />

              <Flex direction={{ base: "column", lg: "row" }}>
                {/* TODO: remove hardcoded value */}
                <Text mr={10} mb={0} mt={{ base: 2, lg: 0 }}>
                  <Translation id="average-score" /> <Text as="span">83%</Text>
                </Text>

                <Text mb={0}>
                  {/* TODO: remove hardcoded value */}
                  <Translation id="completed" />{" "}
                  <Text as="span">2/{totalQuizzesNumber}</Text>
                </Text>
              </Flex>
            </Stack>
          </GridItem>
        </Grid>

        {/* community stats */}
        <Flex
          direction="column"
          gap={6}
          justifyContent="space-between"
          bg="ednBackground"
          borderRadius={{ base: "none", lg: "lg" }}
          border="none"
          p={{ base: 8, lg: 12 }}
        >
          <Text fontWeight="bold" fontSize="xl" mb={0}>
            <Translation id="community-stats" />
          </Text>

          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: 6, md: 10 }}
          >
            <Stack>
              <Text mr={10} mb={-2}>
                <Translation id="average-score" />
              </Text>
              {/* Data from Matomo, manually updated */}
              <Text>67,4%</Text>
            </Stack>

            <Stack>
              <Text mr={10} mb={-2}>
                <Translation id="questions-answered" />
              </Text>

              {/* Data from Matomo, manually updated */}
              <Text>100 000+</Text>
            </Stack>

            <Stack>
              <Text mr={10} mb={-2}>
                <Translation id="retry" />
              </Text>

              {/* Data from Matomo, manually updated */}
              <Text>15,6%</Text>
            </Stack>
          </Flex>
        </Flex>
      </Stack>
    </Box>
  )
}

export default QuizzesStats