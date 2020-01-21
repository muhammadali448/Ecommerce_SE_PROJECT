exports.rangesOfProductsPrices_project = {
  price: 1,
  range: {
    $cond: [
      {
        $and: [{ $gte: ["$price", 0] }, { $lte: ["$price", 99] }]
      },
      "0-99",
      {
        $cond: [
          {
            $and: [{ $gte: ["$price", 100] }, { $lte: ["$price", 499] }]
          },
          "100-499",
          {
            $cond: [
              {
                $and: [{ $gte: ["$price", 500] }, { $lte: ["$price", 999] }]
              },
              "500-999",
              {
                $cond: [
                  {
                    $and: [
                      { $gte: ["$price", 1000] },
                      { $lte: ["$price", 10000] }
                    ]
                  },
                  "1000-9999",
                  {
                    $cond: [
                      {
                        $and: [
                          { $gte: ["$price", 10000] },
                          { $lte: ["$price", 20000] }
                        ]
                      },
                      "10000-19999",
                      {
                        $cond: [
                          {
                            $and: [
                              { $gte: ["$price", 20000] },
                              { $lte: ["$price", 29999] }
                            ]
                          },
                          "20000-29999",
                          {
                            $cond: [
                              {
                                $and: [
                                  { $gte: ["$price", 30000] },
                                  { $lte: ["$price", 39999] }
                                ]
                              },
                              "30000-39999",
                              {
                                $cond: [
                                  {
                                    $and: [
                                      { $gte: ["$price", 40000] },
                                      { $lte: ["$price", 49999] }
                                    ]
                                  },
                                  "40000-49999",
                                  {
                                    $cond: [
                                      {
                                        $and: [
                                          { $gte: ["$price", 50000] },
                                          { $lte: ["$price", 59999] }
                                        ]
                                      },
                                      "50000-59999",
                                      {
                                        $cond: [
                                          {
                                            $and: [
                                              { $gte: ["$price", 60000] },
                                              { $lte: ["$price", 69999] }
                                            ]
                                          },
                                          "60000-69999",
                                          {
                                            $cond: [
                                              {
                                                $and: [
                                                  {
                                                    $gte: ["$price", 70000]
                                                  },
                                                  {
                                                    $lte: ["$price", 79999]
                                                  }
                                                ]
                                              },
                                              "70000-79999",
                                              {
                                                $cond: [
                                                  {
                                                    $and: [
                                                      {
                                                        $gte: ["$price", 80000]
                                                      },
                                                      {
                                                        $lte: ["$price", 89999]
                                                      }
                                                    ]
                                                  },
                                                  "80000-89999",
                                                  {
                                                    $cond: [
                                                      {
                                                        $and: [
                                                          {
                                                            $gte: [
                                                              "$price",
                                                              90000
                                                            ]
                                                          },
                                                          {
                                                            $lte: [
                                                              "$price",
                                                              99999
                                                            ]
                                                          }
                                                        ]
                                                      },
                                                      "90000-99999",
                                                      "100,000 & Above"
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
