const mockPosts = [
  {
    author: "63aca5741db94876567e0f34",
    voteCount: 4,
    url: "https://media.istockphoto.com/id/847714996/photo/miami-beach-florida-usa.jpg?s=612x612&w=0&k=20&c=lT0wFzLOav0uoA8-glWpps552IVbHZaXEGtEtMxjVM8=",
    title: "Miami Beach",
    content:
      "Best place to be a local, if you can handle the dangerous tourists that you will certainly encounter",
    label: "blue",
  },
  {
    author: "63aca5741db94876567e0f34",
    voteCount: 13,
    url: "data:image/jpeg;base64,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",
    title: "Key West",
    content:
      "Most beautiful sunset in florida. This place is simply a throwback visually with future mind-set social life",
    label: "blue",
  },
  {
    author: "63aca5741db94876567e0f34",
    voteCount: 89,
    url: "https://media.istockphoto.com/id/608540602/photo/aerial-panorama-of-botafogo-bay-rio-de-janeiro.jpg?s=612x612&w=0&k=20&c=9vsK_9r4ldoLyfS6oLnUbvpQOgYCfzr4xCZ1-YFNJZo=",
    title: "Rio de Janeiro",
    content:
      "A beleza da cidade maravilhosa nunca para que encantar a todos que aqui visitam.",
    label: "gray",
  },
  {
    author: "63aca5741db94876567e0f34",
    voteCount: 3,
    url: "https://media.istockphoto.com/id/878377556/photo/sao-paulo.jpg?s=612x612&w=0&k=20&c=YIIn27eI1l_iNx-IOn48w93ZLpfki2akZhFeBljU6LA=",
    title: "Sao Paulo",
    content:
      "Bem vindo a floresta de concreto, on o ceu cinza acelera a vibe e mantem todos ocupados, e tossindo.",
    label: "gray",
  },
  {
    author: "63aca5741db94876567e0f34",
    voteCount: 4,
    url: "https://media.istockphoto.com/id/524399815/photo/fort-lauderdale-beach.jpg?s=612x612&w=0&k=20&c=52xBqlbBPHlV0L9tK_i35ws6J3WLrJoMG9FsBCge8qU=",
    title: "North Beach",
    content:
      "Best place to be a local, if you can handle the dangerous tourists that you will certainly encounter",
    label: "blue",
  },
  {
    author: "63aca5741db94876567e0f34",
    voteCount: 4,
    url: "https://www.thoughtco.com/thmb/l0Ei2qSYEp6vtU6a1o0FtphhV4s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SaharaDesert-58c1a5603df78c353c3d525d.jpg",
    title: "Sahara Desert",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat id. Vitae tortor condimentum lacinia quis vel eros donec. Diam maecenas ultricies mi eget mauris. Ut tristique et egestas quis ipsum suspendisse ultrices. Nam libero justo laoreet sit. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Tristique senectus et netus et malesuada. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Justo donec enim diam vulputate ut pharetra sit amet aliquam. Risus ultricies tristique nulla aliquet enim tortor. Orci sagittis eu volutpat odio facilisis mauris sit. Facilisis sed odio morbi quis commodo. Sodales ut etiam sit amet nisl purus. Commodo viverra maecenas accumsan lacus vel facilisis volutpat. Lorem dolor sed viverra ipsum nunc aliquet.Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Auctor eu augue ut lectus arcu bibendum. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Sed elementum tempus egestas sed. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida. Justo nec ultrices dui sapien eget mi proin sed libero. Sed arcu non odio euismod lacinia at. Faucibus scelerisque eleifend donec pretium vulputate sapien nec. Sit amet consectetur adipiscing elit pellentesque habitant morbi tristique. Nulla facilisi cras fermentum odio. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi. Magna ac placerat vestibulum lectus. Non nisi est sit amet facilisis magna etiam.",
    label: "orange",
  },
  {
    author: "63aca5741db94876567e0f34",
    voteCount: 13,
    url: "http://cdn.cnn.com/cnnnext/dam/assets/220219185628-07-lenis-maranhenses-national-park.jpg",
    title: "Lecoes Maranhenses",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat id. Vitae tortor condimentum lacinia quis vel eros donec. Diam maecenas ultricies mi eget mauris. Ut tristique et egestas quis ipsum suspendisse ultrices. Nam libero justo laoreet sit. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Tristique senectus et netus et malesuada. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Justo donec enim diam vulputate ut pharetra sit amet aliquam. Risus ultricies tristique nulla aliquet enim tortor. Orci sagittis eu volutpat odio facilisis mauris sit. Facilisis sed odio morbi quis commodo. Sodales ut etiam sit amet nisl purus. Commodo viverra maecenas accumsan lacus vel facilisis volutpat. Lorem dolor sed viverra ipsum nunc aliquet.Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Auctor eu augue ut lectus arcu bibendum. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Sed elementum tempus egestas sed. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida. Justo nec ultrices dui sapien eget mi proin sed libero. Sed arcu non odio euismod lacinia at. Faucibus scelerisque eleifend donec pretium vulputate sapien nec. Sit amet consectetur adipiscing elit pellentesque habitant morbi tristique. Nulla facilisi cras fermentum odio. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi. Magna ac placerat vestibulum lectus. Non nisi est sit amet facilisis magna etiam.",
    label: "orange",
  },
];

const mockUsers = [
  {
    username: "fakemedic",
    email: "med@med.com",
    password: "$2b$10$h036pK1tWvpYRB3Evbq9j.nk57Zh.OwWtzHXTQhgBbaRhS4LIitsC",
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  },
  {
    username: "freesoul",
    email: "free@free.com",
    password: "$2b$10$h036pK1tWvpYRB3Evbq9j.nk57Zh.OwWtzHXTQhgBbaRhS4LIitsC",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  },
  {
    username: "DaBom",
    password: "$2b$10$h036pK1tWvpYRB3Evbq9j.nk57Zh.OwWtzHXTQhgBbaRhS4LIitsC",
    email: "dabom@dabom.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHBlcnNvbnxlbnwwfHwwfHw%3D&w=1000&q=80",
  },
  {
    username: "lastcaique",
    email: "lastcaique@lastcaique.com",
    password: "$2b$10$h036pK1tWvpYRB3Evbq9j.nk57Zh.OwWtzHXTQhgBbaRhS4LIitsC",
    avatar:
      "https://st2.depositphotos.com/3143277/8644/i/600/depositphotos_86446164-stock-photo-business-man-in-office.jpg",
  },
];

module.exports = { mockPosts, mockUsers };
