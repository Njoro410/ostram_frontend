import React, { useState } from "react";
import { useGetWeatherDataQuery } from "../app/api/weatherSlice";
import { Box, Divider, Typography, alpha, useTheme } from "@mui/material";
import Sunny from "../assets/weather/sunny.jpg";
import Rainy from "../assets/weather/rainy.jpg";
import Cloudy from "../assets/weather/cloudy.jpg";
import Partly from "../assets/weather/partly-cloudy.jpg";
import FlexBetween from "./FlexBetween";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WeatherData = ({ location }) => {
  const theme = useTheme();
  const {
    data: weather,
    isLoading,
    isError,
    error,
  } = useGetWeatherDataQuery(location);

  const getTimeFromDate = (dateString) => {
    const date = new Date(dateString);
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const timeString = date.toLocaleTimeString(undefined, timeOptions);

    return timeString;
  };

  const getImageUrl = () => {
    if (weather && weather?.current.condition.code) {
      const weatherCondition = weather?.current.condition.code;

      switch (weatherCondition) {
        case 1000:
          return Sunny;
        case 1063 ||
          1180 ||
          1183 ||
          1186 ||
          1189 ||
          1192 ||
          1195 ||
          1198 ||
          1201 ||
          1276 ||
          1273 ||
          1264 ||
          1240 ||
          1261:
          return Rainy;
        case 1006 || 1009 || 1030 || 1135:
          return Cloudy;
        case 1003:
          return Partly;

        default:
          return null;
      }
    }
  };

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    variableWidth: true,
    arrows: true,
    infinite: true,
  };

  const imageUrl = getImageUrl();
  const forecastWeather = weather?.forecast?.forecastday[0].hour.map(
    (time) => time
  );

  const filterForecastWeather = (forecastWeather) => {
    if (!forecastWeather || !Array.isArray(forecastWeather)) {
      return [];
    }

    const currentTimestamp = Date.now();

    return forecastWeather.filter((item) => {
      const itemTimestamp = new Date(item.time).getTime();
      return itemTimestamp > currentTimestamp;
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {imageUrl && (
        <Box
          component="img"
          sx={{
            width: "100%",
            height: "18.1rem",
            objectFit: "cover",
            opacity: 0.5,
            filter: `blur(1px)`,
          }}
          src={imageUrl}
          alt={weather?.location.name}
        />
      )}
      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          left: 0,
          width: "100%",
          padding: "1rem",
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: "3rem",
            }}
          >
            {weather?.location.name}
          </Typography>
        </Box>
        <FlexBetween sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={weather?.current.condition.icon}
              alt={weather?.location.name}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: "1.5rem",
              }}
            >
              {weather?.current.condition.text}
            </Typography>
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: "1.5rem",
              px: "1rem",
            }}
          >
            {weather?.current.temp_c}&#176;C
          </Typography>
        </FlexBetween>
        <Box width="100%">
          <Slider {...settings}>
            {filterForecastWeather(forecastWeather).map((hour) => (
              <Box
                sx={{
                  // padding: "0.3rem",
                  width: "100%",
                  marginTop: "1rem",
                }}
                key={hour.time_epoch}
              >
                <Box
                  sx={{
                    color: "#f5f5f5",
                    backgroundColor: alpha("#000000", 0.2),
                    width: "100%",
                    textAlign: "center",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="button"
                    display="block"
                    gutterBottom
                  >
                    {getTimeFromDate(hour.time)}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      component="img"
                      sx={{ width: "3rem" }}
                      src={hour.condition.icon}
                      alt={hour.condition.text}
                    />

                    <Typography
                      variant="button"
                      display="block"
                      gutterBottom
                      sx={{ fontWeight: "bold", paddingRight: "1rem" }}
                    >
                      {hour.temp_c}&#176;C
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ padding: 1 }}
                    variant="button"
                    display="block"
                    gutterBottom
                  >
                    {hour.condition.text}
                  </Typography>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default WeatherData;
