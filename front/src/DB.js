const dataBase = [
    {course: 'Курс 1', id: 1, modules:[
        {moduleTitle: 'Модуль 1', id: 1, groups: [
            {groupTitle: 'Группа 1', id: 1,  mouth:[
                { lessons: [
                    {day: [
                        {id: 1, title: 'Занятие 1', time: '13:00', teacher: 'teacher1', teacherHours: 1},
                        {id: 2, title: 'Занятие 2', time: '14:00', teacher: 'teacher1', teacherHours: 2},
                        {id: 3, title: 'Занятие 3', time: '15:00', teacher: 'teacher', teacherHours: 1.5}
                    ]},
                    {day: [
                        {id: 4, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 2},
                        {id: 5, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 2},
                        {id: 6, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 2}
                    ]},
                    {day: [
                        {id: 7, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 8, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 9, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 10, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 11, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 12, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 13, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 14, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 15, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]}
                ]},
                { lessons: [
                    {day: [
                        {id: 1, title: 'Занятие ы', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 2, title: 'Занятие 2', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 3, title: 'Занятие 3', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 4, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 5, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 6, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 7, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 8, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 9, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 10, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 11, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 12, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 13, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 14, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 15, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]}
                ]},
                { lessons: [
                    {day: [
                        {id: 1, title: 'Занятие 1', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 2, title: 'Занятие 2', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 3, title: 'Занятие 3', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 4, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 5, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 6, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 7, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 8, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 9, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 10, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 11, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 12, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 13, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 14, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 15, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]}
                ]}
            ]},
            {groupTitle: 'Группа 2', id: 2,  mouth:[
                { lessons: [
                    {day: [
                        {id: 1, title: 'Занятие а', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 2, title: 'Занятие б', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 3, title: 'Занятие в', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 4, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 5, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 6, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 7, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 8, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 9, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 10, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 11, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 12, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 13, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 14, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 15, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]}
                ]}
            ]}
            
        ]},
        {moduleTitle: 'Модуль 2', id: 2, groups: [
            {groupTitle: 'Группа 1', id: 1,  mouth:[
                { lessons: [
                {day: [
                    {id: 1, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                    {id: 2, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                    {id: 3, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                ]}
                ]}
            ]},
            {groupTitle: 'Группа 2', id: 2,  mouth:[
                { lessons: [
                {day: [
                    {id: 1, title: 'Занятие ы', time: '13:00', teacher: 'teacher', teacherHours: 1},
                    {id: 2, title: 'Занятие ы', time: '14:00', teacher: 'teacher', teacherHours: 1},
                    {id: 3, title: 'Занятие ы', time: '15:00', teacher: 'teacher', teacherHours: 1}
                ]},
                {day: [
                    {id: 4, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                    {id: 5, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                    {id: 6, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                ]},
                {day: [
                    {id: 7, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                    {id: 8, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                    {id: 9, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                ]},
                {day: [
                    {id: 10, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                    {id: 11, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                    {id: 12, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                ]},
                {day: [
                    {id: 13, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                    {id: 14, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                    {id: 15, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                ]}
                ]},
                { lessons: [
                    {day: [
                        {id: 1, title: 'Занятие ы', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 2, title: 'Занятие ы', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 3, title: 'Занятие ы', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 4, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 5, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 6, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 7, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 8, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 9, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 10, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 11, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 12, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 13, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 14, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 15, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]}
                    ]}
            ]}
            
        ]}
        
    ]},
    {course: 'Курс 2', id: 2, modules:[
        {moduleTitle: 'Модуль 1', id: 1, groups: [
            {groupTitle: 'Группа 1', id: 1,  mouth:[
                { lessons: [
                    {day: [
                        {id: 1, title: 'Занятие 1', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 2, title: 'Занятие 2', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 3, title: 'Занятие 3', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 4, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 5, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 6, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 7, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 8, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 9, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 10, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 11, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 12, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 13, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 14, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 15, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]}
                ]},
                { lessons: [
                    {day: [
                        {id: 1, title: 'Занятие 1', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 2, title: 'Занятие 2', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 3, title: 'Занятие 3', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 4, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 5, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 6, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 7, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 8, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 9, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 10, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 11, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 12, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 13, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 14, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 15, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]}
                ]},
                { lessons: [
                    {day: [
                        {id: 1, title: 'Занятие 1', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 2, title: 'Занятие 2', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 3, title: 'Занятие 3', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 4, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 5, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 6, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 7, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 8, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 9, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 10, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 11, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 12, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 13, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 14, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 15, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]}
                ]}
            ]},
            {groupTitle: 'Группа 2', id: 2,  mouth:[
                { lessons: [
                    {day: [
                        {id: 1, title: 'Занятие а', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 2, title: 'Занятие б', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 3, title: 'Занятие в', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 4, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 5, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 6, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 7, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 8, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 9, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 10, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 11, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 12, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 13, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 14, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 15, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]}
                ]}
            ]}
            
        ]},
        {moduleTitle: 'Модуль 2', id: 2, groups: [
            {groupTitle: 'Группа 1', id: 1,  mouth:[
                { lessons: [
                {day: [
                    {id: 1, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                    {id: 2, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                    {id: 3, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                ]}
                ]}
            ]},
            {groupTitle: 'Группа 2', id: 2,  mouth:[
                { lessons: [
                {day: [
                    {id: 1, title: 'Занятие ы', time: '13:00', teacher: 'teacher', teacherHours: 1},
                    {id: 2, title: 'Занятие ы', time: '14:00', teacher: 'teacher', teacherHours: 1},
                    {id: 3, title: 'Занятие ы', time: '15:00', teacher: 'teacher', teacherHours: 1}
                ]},
                {day: [
                    {id: 4, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                    {id: 5, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                    {id: 6, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                ]},
                {day: [
                    {id: 7, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                    {id: 8, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                    {id: 9, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                ]},
                {day: [
                    {id: 10, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                    {id: 11, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                    {id: 12, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                ]},
                {day: [
                    {id: 13, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                    {id: 14, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                    {id: 15, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                ]}
                ]},
                { lessons: [
                    {day: [
                        {id: 1, title: 'Занятие ы', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 2, title: 'Занятие ы', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 3, title: 'Занятие ы', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 4, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 5, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 6, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 7, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 8, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 9, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 10, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 11, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 12, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]},
                    {day: [
                        {id: 13, title: 'Занятие', time: '13:00', teacher: 'teacher', teacherHours: 1},
                        {id: 14, title: 'Занятие', time: '14:00', teacher: 'teacher', teacherHours: 1},
                        {id: 15, title: 'Занятие', time: '15:00', teacher: 'teacher', teacherHours: 1}
                    ]}
                    ]}
            ]}
            
        ]}
        
    ]},
]

export default dataBase