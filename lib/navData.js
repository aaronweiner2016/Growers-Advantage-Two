const navbarData = [
  {
    nav_title: "Products",
    nav_link: "#",
    dropdown: [
      {
        dropdown_column_class: "col-6 col-md-4 col-lg-6",
        dropdown_column: [
          {
            dropdown_header: "",
            dropdown_section_class: "col",
            dropdown_section: [
              {
                dropdown_title: "Pricing",
                dropdown_link: "/pricing"
              },
              {
                dropdown_title: "Presentation",
                dropdown_link: "/presentation"
              },
              {
                dropdown_title: "Commercial Lights",
                dropdown_link: "/commercial"
              },
              {
                dropdown_title: "Residential Lights",
                dropdown_link: "/residential"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    nav_title: "Science",
    nav_link: "#",
    dropdown: [
      {
        dropdown_column_class: "col-6 col-md-4 col-lg-6",
        dropdown_column: [
          {
            dropdown_header: "",
            dropdown_section_class: "col",
            dropdown_section: [
              {
                dropdown_title: "All Science",
                dropdown_link: "/search"
              },
              {
                dropdown_title: "Presentation",
                dropdown_link: "/presentation"
              },
              {
                dropdown_title: "Home Growing",
                dropdown_link: "/case-study-1"
              },
              {
                dropdown_title: "Residential",
                dropdown_link: "/residential"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    nav_title: "About",
    nav_link: "/about"
  },
  {
    nav_title: "Contact",
    nav_link: "/contact"
  },
  {
    nav_title: "More",
    nav_link: "#",
    dropdown: [
      {
        dropdown_column_class: "col-6 col-md-4",
        dropdown_column: [
          {
            dropdown_header: "Company",
            dropdown_section_class: "col-6 col-md-12",
            dropdown_section: [
              {
                dropdown_title: "Services",
                dropdown_link: "/services"
              },
              {
                dropdown_title: "404",
                dropdown_link: "/404"
              }
            ]


          }
        ]
      }
    ]
  }
]

module.exports = navbarData;
